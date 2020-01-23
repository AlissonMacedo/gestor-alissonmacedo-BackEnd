import * as Yup from 'yup';
import Class from '../models/Class';
import User from '../models/User';

class ClassController {
  async index(req, res) {
    const { empresa_id } = await User.findByPk(req.userId);

    const classe = await Class.findAll({
      where: { empresa_id },
    });

    return res.json(classe);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const classExists = await Class.findOne({
      where: { name: req.body.name },
    });

    if (classExists) {
      return res.status(400).json({ error: 'This name is used.' });
    }

    const { empresa_id } = await User.findByPk(req.userId);

    const { id, name } = await Class.create({
      name: req.body.name,
      empresa_id,
    });

    return res.json({ id, name });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { className } = req.body;

    const classe = await Class.findByPk(req.classId);

    if (className !== classe.name) {
      const classExists = await Class.findOne({
        where: { name: className },
      });

      if (classExists) {
        return res.status(400).json({ error: 'This name is used.' });
      }
    }

    await classe.update(req.body);

    const { id, name } = await Class.findByPk(req.classId);

    return res.json({ id, name });
  }

  async delete(req, res) {
    return null;
  }
}

export default new ClassController();
