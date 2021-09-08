import Prisma from '@prisma/client'
const { PrismaClient } = Prisma

const { role } = new PrismaClient
const { user } = new PrismaClient

export async function initialRoles() {
    const counter = await role.count()

    if ( counter > 0 ) return

    try {
        const roles = await role.createMany( {
            data : [
                { name : "Superadmin", description : "Description for Superadmin" },
                { name : "Admin", description : "Description for Admin" },
                { name : "User", description : "Description for User" },
            ]
        } )

        console.log( roles )
    } catch (error) {
        console.log(error)
    }
}
