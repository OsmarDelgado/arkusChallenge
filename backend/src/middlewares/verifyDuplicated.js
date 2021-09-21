import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { user, role } = new PrismaClient

export async function verifyDuplicateUser( req, res, next ) {
    const { email } = req.body
    
    try {
        if( email ) {
            const userExist = await user.findUnique( {
                where : {
                    email
                }
            } )
    
            if( userExist ) return res.status( 400 ).json( { message : 'User already exist!' } )
        }

        return next()

    } catch (error) {
        console.log( error )
    }
}

export async function verifyRoleExist( req, res, next ) {
    const { roleId } = req.body

    try {
        if( roleId ) {
            const roleExist = await role.findUnique( {
                where : {
                    id : parseInt( roleId )
                }
            } )
    
            if( !roleExist ) return res.status( 400 ).json( { message : 'Role does not exist' } )
    
            return next()
        }

        return next()

    } catch (error) {
        console.log( error )
    }
}