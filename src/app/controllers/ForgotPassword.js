import * as Yup from 'yup';
import crypto from 'crypto';
import User from '../models/User';
import mail from '../../lib/Mail';

class ForgotPasswordController {
  async index(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { email } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ erro: ' User not foud' });
      }

      const token = crypto.randomBytes(20).toString('hex');

      const expiresToken = new Date();

      expiresToken.setHours(expiresToken.getHours() + 1);

      await user.update({
        password_reset_token: token,
        password_reset_expires: expiresToken,
      });

      mail.sendMail(
        {
          to: `${email} <${email}>`,
          subject: 'Recuperacao de senha',
          template: 'forgotpassword',
          context: {
            user: user.name,
            token,
            APP_URL_FRONT: process.env.APP_URL_FRONT,
          },
        },
        err => {
          if (err) {
            return res
              .status(400)
              .send({ error: 'Canot send forgot password email' });
          }
          return res.send(200);
        }
      );

      return res.json({ Success: 'Send email success' });
      //
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Error on forgot password, try again' });
    }
  }

  async store(req, res) {
    const { email, token, password } = req.body;

    return res.json({ email, token, password });
  }
}

export default new ForgotPasswordController();
