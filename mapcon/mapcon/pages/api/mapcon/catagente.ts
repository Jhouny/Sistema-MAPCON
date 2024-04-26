import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import base from '../../../lib/back/base_query'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({ req })

    if (session) {

        if (req.method == 'GET' && req.query.id) {
            res.status(200).json(await base.getModel('categoria_agente', { 'num_seq_categoria_agente': req.query.id }))
        } else if (req.method == 'GET') {
            res.status(200).json(await base.getModels('categoria_agente', req.query))
        } else if (req.method == 'POST') {
            res.status(200).json(await base.addModel('categoria_agente', req.body))
        } else if (req.method == 'PUT'){
            res.status(200).json(await base.updateModel('categoria_agente',{ 'num_seq_categoria_agente': req.body.num_seq_categoria_agente },req.body))
        } else if (req.method == 'DELETE'){
            console.log(req)
            res.status(200).json(await base.deleteModel('categoria_agente',{ 'num_seq_categoria_agente': req.body.num_seq_categoria_agente }))
        }

    } else {

        res.status(401).json({ "Acesso Negado": "Você não possui permissão para acessar esses dados." })

    }

}
