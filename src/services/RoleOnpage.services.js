import { prisma_Connector } from "../../index.js";

export async function createRoleOnPage_Master(req, res) {
    try {
        // Prepare to insert each page's permissions
        const data=req?.body?.data
        var crete_page=await prisma_Connector?.page?.create({data})
        return res.json({ statusCode: 0, data: crete_page});

    } catch (error) {
      
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}