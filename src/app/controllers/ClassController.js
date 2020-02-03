import * as Yup from 'yup';
import Classe from '../models/Classe';
import User from '../models/User';

class ClassController {
  async index(req, res) {
    const { empresa_id } = await User.findByPk(req.userId);

    const { page = 1, quantity = 20 } = req.params;

    const classe = await Classe.findAll({
      where: { empresa_id },
      limit: quantity,
      offset: (page - 1) *
    });

    return res.json(classe);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      course_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // const classExists = await Class.findOne({
    //   where: { name: req.body.name },
    // });

    // if (classExists) {
    //   return res.status(400).json({ error: 'This name is used.' });
    // }

    const { empresa_id } = await User.findByPk(req.userId);

    const { id, name, course_id } = await Classe.create({
      name: req.body.name,
      course_id: req.body.course_id,
      empresa_id,
    });

    return res.json({ id, name, course_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const classe = await Classe.findByPk(req.params.id);

    await classe.update(req.body);

    return res.json({ Sucess: 'Class has been succefully updated' });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Classe.destroy({ where: { id } });

    return res.send(id);
  }
}

export default new ClassController();
