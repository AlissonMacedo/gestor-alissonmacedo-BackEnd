import * as Yup from 'yup';
import User from '../models/User';
import Empresa from '../models/Empresa';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const user = req.body;

    const { id, name } = await Empresa.create({
      name: user.name,
    });

    const userCreated = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      provider: true,
      empresa_id: id,
    });

    return res.json({ success: 'user created successfully.' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string(6).when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name } = await User.findByPk(req.userId);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    const userLoged = await User.findByPk(req.userId);

    if (user.id === userLoged.id) {
      return res.status(401).json({ error: 'You can not delete your user!' });
    }

    if (userLoged.provider === false) {
      return res.status(401).json({ error: 'You can not delete a user!' });
    }

    await user.destroy();

    console.log('deu certo!');

    return res.status(400).json({ Success: 'Usuário deletado!' });
  }
}

export default new UserController();
