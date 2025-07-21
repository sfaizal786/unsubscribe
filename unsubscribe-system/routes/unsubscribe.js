import express from 'express';
import Prospect from '../models/Prospect.js';

const router = express.Router();

router.get('/unsubscribe', async (req, res) => {
  const { workspace, prospect } = req.query;

  if (!workspace || !prospect) {
    return res.status(400).send('<h2>Missing workspace or prospect email.</h2>');
  }

  try {
    const email = prospect.toLowerCase();
    const workspaceEmail = workspace.toLowerCase();

    let match = await Prospect.findOne({ email, workspaceEmail });

    if (!match) {
      // If not found, create and unsubscribe
      match = new Prospect({
        email,
        name: email.split('@')[0], // or leave blank if you want
        workspaceEmail,
        unsubscribed: true
      });
      await match.save();
      return res.send(`
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
    <h2 style="color: #dc3545;">${email} has been unsubscribed.</h2>
    <p style="color: #6c757d;">You will no longer receive emails from this Email Address.</p>
  </div>
`);

    }

    if (match.unsubscribed) {
     return res.send(`
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
    <h2 style="color: #6c757d;">${email} is already unsubscribed.</h2>
  </div>
`);

    }

    // If exists and not yet unsubscribed
    match.unsubscribed = true;
    await match.save();

   res.send(`
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
    <h2 style="color: #28a745;">${email} has been successfully unsubscribed.</h2>
  </div>
`);

  } catch (err) {
    console.error('Unsubscribe error:', err);
    res.status(500).send('<h2>Internal server error.</h2>');
  }
});

export default router;
