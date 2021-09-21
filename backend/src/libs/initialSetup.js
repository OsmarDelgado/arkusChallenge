import bcrypt from 'bcryptjs'
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

export async function createSuperUser() {
    const counter = await user.count()

    if ( counter > 0 ) return
    
    try {
        const superUser = await user.create( {
            data : {
                username : 'admin',
                email : 'admin@admin.com',
                firstName : 'admin',
                lastName : 'admin',
                password : await bcrypt.hash( 'admin', 10 ),
                roleId : 1,
                // profile : {
                //     create : {
                //         bio : 'here comes somenthing great of you',
                //         englishLevel : 'Your English level',
                //         technicalKnowledge : 'Your technical knowledge',
                //         urlCV : 'Your ArkusNexus CV Link'
                //     }
                // }
            }
        } )

        console.log( `SuperUser created: ${ JSON.stringify(superUser, null, 4) }` )

    } catch (error) {
        console.log( error )
    }
}
