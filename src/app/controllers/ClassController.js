import * as Yup from 'yup';
import Class from '../models/Class';

class ClassController {
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

    const { id, name } = await Class.create(req.body);

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
}

export default new ClassController();
