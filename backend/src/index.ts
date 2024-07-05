import express from 'express';
import cookieParser from 'cookie-parser';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);
const secret = '123';
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const token = jwt.sign(
        {
            id: 1
        },
        secret
    );
    res.cookie('token', token);
    res.send('SIgned In');
});

app.get('/user', (req, res) => {
    const cookie = req.cookies.token;
    const decoded = jwt.verify(cookie, secret) as JwtPayload;
    const id = decoded.id;
    res.send({ id });
});

app.post('/signout', (req, res) => {
    res.clearCookie('token');
    res.send('Successfully logged out');
});
app.listen(3000);

