import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { role } = new PrismaClient

export async function getRoles( req, res ) {
    try {
        const roles = await role.findMany()
    
        return res.status( 200 ).json( {
            message : "Roles",
            data : roles
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function getRoleById( req, res ) {
    const { roleId } = req.params

    try {
        const roleUnique = await role.findUnique( {
            where : {
                id : parseInt( roleId )
            }
        } )

        if( !roleUnique ) {
            return res.status( 404 ).json( {
                message : "Role does not exist!",
                data : {}
            } )
        }
    
        return res.status( 200 ).json( {
            message : "Role",
            data : roleUnique
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function createRole( req, res ) {
    const { name, description } = req.body

    try {
        const roleExist = await role.findFirst( {
            where : {
                name
            },

            select : {
                name : true,
                description : true
            }
        } )

        if( roleExist ) {
            return res.status( 400 ).json( {
                message : "Role already exist!",
                data : roleExist
            } )
        }

        const roleCreated = await role.create( {
            data : {
                name,
                description
            }
        } )

        return res.status( 201 ).json( {
            message : "Role created successfully",
            data : roleCreated
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function updateRole( req, res ) {
    const { roleId } = req.params
    const { name, description } = req.body

    try {
        const roleVerifyExist = await role.findFirst( {
            where : {
                name
            }
        } )

        if( roleVerifyExist ) {
            return res.status( 409 ).json( {
                message : "Role already exist!",
                data : roleVerifyExist
            } )
        }
        
        const roleUpdate = await role.update( {
            where : {
                id : parseInt( roleId )
            },

            data : {
                name,
                description
            }
        } )

        return res.status( 200 ).json( {
            message : "Role updated successfully",
            data : roleUpdate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function deleteRole( req, res ) {
    const { roleId } = req.params

    try {
        const roleDelete = await role.delete( {
            where : {
                id : parseInt( roleId )
            }
        } )
    
        return res.status( 201 ).json( {
            message : "Role deleted successfully",
            data : roleDelete
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}