import * as Yup from 'yup';
import Course from '../models/Course';
import User from '../models/User';

class CourseController {
  async index(req, res) {
    const { empresa_id } = await User.findByPk(req.userId);

    const course = await Course.findAll({
      where: { empresa_id },
    });

    return res.json(course);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { empresa_id } = await User.findByPk(req.userId);

    const { id, name } = await Course.create({
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

    const course = await Course.findByPk(req.params.id);

    await course.update(req.body);

    return res.json({ Success: 'Couse has ben succefully updated' });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Course.destroy({
      where: { id },
    });

    return res.send({ Success: 'Course success deleted' });
  }
}

export default new CourseController();
