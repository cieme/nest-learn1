import { Request, Response, NextFunction } from 'express';
const whiteList = ['/api/login', '/api/captcha'];
const checkWhiteList = (url: string) => {
  return whiteList.includes(url);
};
export function globalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (checkWhiteList(req.url)) {
    next();
  } else {
    next();
    // res.status(403).json({ statusCode: 403, message: 'Forbidden' });
  }
}
