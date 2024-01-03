import jwt from 'jsonwebtoken';

export default (req: any, res: any, next: any) => {
  const token = req.headers.access_token as string;

  if (!token) return res.status(401).send({ message: 'No token' });

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decodedUser;

  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }

  return next();
};