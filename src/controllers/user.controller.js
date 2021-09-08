import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { user } = new PrismaClient

export async function getUsers( req, res ) {
    try {
        const users = await user.findMany()
    
        return res.status( 200 ).json( {
            message : 'Users',
            data : users
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function getUsersById( req, res ) {
    const { userId } = req.params

    try {
        const userFound = await user.findUnique( {
            where : {
                id : parseInt( userId )
            }
        } )

        if( !userFound ) {
            return res.status( 404 ).json( {
                message : "User does not exist!",
                data : {}
            } )
        }
    
        return res.status( 200 ).json( {
            message : "User",
            data : userFound
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function createUser( req, res ) {
    const { username, email, firstName, lastName, password, role } = req.body 
    
    try {
        const userExist = await user.findUnique( {
            where: {
                username
            },

            select: {
                username: true
            }
        } )

        if( userExist ) {
            return res.status(400).json( {
                message : "User already exist!"
            } )
        }

        const userUser = await user.create( {
            data: {
                username,
                email,
                firstName,
                lastName,
                password,
                role,
            }
        } )

        return res.stataus(201).json( {
            message: "User created successfully!",
            data: userUser
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function updateUser( req, res ) {
    res.json( 'Update user' )
    
}

export async function deleteUser( req, res ) {
    res.json( 'Delete user' )
    
}