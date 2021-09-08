import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../auth/auth.config.js'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { user } = new PrismaClient

export async function signUp( req, res ) {
    const { username, email, firstName, lastName, password, roleId } = req.body

    try {
        const userFound = await user.create( {
            data : {
                username,
                email,
                firstName,
                lastName,
                password : await bcrypt.hash( password, 10 ),
                roleId,
                profile : {
                    create : {
                        bio : 'here comes somenthing great of you',
                        englishLevel : 'Your English level',
                        technicalKnowledge : 'Your technical knowledge',
                        urlCV : 'Your ArkusNexus CV Link'
                    }
                }
            }
        } )

        const token = jwt.sign( { id : userFound.id, email : userFound.email, roleId : userFound.roleId }, config.SECRET, {
            expiresIn : 86400
        } )

        return res.status( 200 ).json( {
            message : "User created succesfuly",
            token : token,
            data : userFound
        } );

    } catch (error) {
        console.log( error )

        return res.status(500).json( {
            message : "Internal Server Error",
            data : []
        } );
    }
}

export async function signIn( req, res ) {
    const { username, email, password } = req.body

    try {
        const userFound = await user.findUnique( {
            where : {
                email
            },

            select : {
                id : true,
                email : true,
                firstName : true,
                lastName : true,
                password : true,
                roleId : true
            }
        } )
    
        if( !userFound ) {
            return res.status( 404 ).json( {
                message : 'User does not exist',
                data : {}
            } )
        }

        const matchPassword = await bcrypt.compare( password, userFound.password );

        if( !matchPassword ) {
            return res.status( 401 ).json( {
                message : "Password is incorrect", 
                token : null
            } )
        }

        const token = jwt.sign( { id : userFound.id, email : userFound.email, roleId : userFound.roleId }, config.SECRET, {
            expiresIn : 86400
        } )

        return res.status( 200 ).json( { token } )

    } catch (error) {
        console.log( error )

        return res.status(500).json( {
            message : "Internal Server Error",
            data : []
        } );
    }
}
