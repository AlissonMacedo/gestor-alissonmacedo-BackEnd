import * as Yup from 'yup';
import Empresa from '../models/Empresa';
import User from '../models/User';

class EmpresaController {
  async store(req, res) {
    const { empresa_id } = await User.findByPk(req.userId);

    const empresa = await Empresa.findByPk(empresa_id);

    return res.json(empresa);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { empresa_id } = await User.findByPk(req.userId);

    const empresa = await Empresa.findByPk(empresa_id);

    await empresa.update(req.body);

    const { id, name } = await Empresa.findByPk(empresa_id);

    return res.json({ id, name });
  }

  async delete(req, res) {
    return res.json({ error: 'Não é possível deletar a empresa!' });
  }
}

export default new EmpresaController();
