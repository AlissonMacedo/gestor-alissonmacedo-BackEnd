import * as Yup from 'yup';
import Company from '../models/Company';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const companyExists = await Company.findOne({
      where: { name: req.body.name },
    });

    if (companyExists) {
      return res.status(400).json({ error: 'This name is used.' });
    }

    const { id, name } = await Company.create(req.body);

    return res.json({ id, name });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const company = await User.findByPk(req.companyId);

    if (name !== company.name) {
      const companyExists = await Company.findOne({
        where: { name },
      });

      if (companyExists) {
        return res.status(400).json({ error: 'This name is used.' });
      }
    }

    await company.update(req.body);

    const { id, name } = await Company.findByPk(req.companyId);

    return res.json({ id, name });
  }
}

export default new CompanyController();
