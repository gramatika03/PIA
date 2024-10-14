import express from 'express'
import AdminM from '../models/admin'
import bcrypt from 'bcrypt'

export class AdminController{

    cypherPassword(password: String) {
        let cypheredPassword = ""
        for(let i = 0; i < password.length; i++) {
            let charCode = password.charCodeAt(i)
            cypheredPassword = cypheredPassword + String.fromCharCode(charCode + 1);
        }
        return cypheredPassword
    }

    decryptPassword(password: String) {
        let cypheredPassword = ""
        for(let i = 0; i < password.length; i++) {
            let charCode = password.charCodeAt(i)
            cypheredPassword = cypheredPassword + String.fromCharCode(charCode - 1);
        }
        return cypheredPassword
    }

    login = (req: express.Request, res: express.Response)=>{
        req.body.password = this.cypherPassword(req.body.password)
        AdminM.findOne({username: req.body.username, password: req.body.password}).then(
            (user) => {
                if(user) {
                    res.json(user);
                } else {
                    res.json(null);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        req.body.passwordOld = this.cypherPassword(req.body.passwordOld)
        req.body.passwordNew = this.cypherPassword(req.body.passwordNew)
        AdminM.findOne({username: req.body.username, password: req.body.passwordOld}).then(
            data => {
                if(data) {
                    AdminM.updateOne({username: req.body.username, password: req.body.passwordOld}, {password: req.body.passwordNew}).then(
                        data => {
                            res.json(true)
                        }
                    )
                } else {
                    res.json(false);
                }
            }
        )
    }
}