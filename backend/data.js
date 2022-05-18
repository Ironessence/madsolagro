import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Alex',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    produse: [
        {
            
            nume: 'Ardei Gogosar Kabala F1',
            slug: 'ardei-gogosar-kabala-f1',
            categorie: 'Seminte de legume',
            imagine: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80',
            pret: 24.00,
            descriere: 'lorem ipsum blaboajsojas saf sfa fas fasfgaijgoajg afaoj foasf jafo afo af a a',
            inStoc: 10,
            reducere: '10%',
        },
        {
            
            nume: 'Adimel',
            slug: 'adimel',
            categorie: 'ingrasaminte',
            imagine: 'https://images.unsplash.com/photo-1609361528183-1acc0d399845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            pret: 34.00,
            descriere: 'lorem ipsum blaboajsojas saf sfa fas fasfgaiasfagagjgoajg afaoj foasf jafo afo afdgagagdg a a',
            inStoc: 5,
            reducere: '10%',
        },
        {
            
            nume: 'Banda de Picurare - DG 10CM',
            slug: 'banda-de-picurare-dg-10cm',
            categorie: 'accesorii-si-sisteme-irigatii',
            imagine: 'https://images.unsplash.com/photo-1516057747705-0609711c1b31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            pret: 112.00,
            descriere: 'loasdsdsdsrem ipsum blaboajsojas saf sfa fas fasfgaiasfagagjgoajg afaoj foasf jafo afo afdgagaasagdg a a',
            inStoc: 10,
            reducere: '10%',
        },
        {
            
            nume: 'Ardei Gras Barbie F1',
            slug: 'ardei-gras-barbie-f1',
            categorie: 'seminte-de-legume',
            imagine: 'https://images.unsplash.com/photo-1592801062201-04fd6cf3d5ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            pret: 58.00,
            descriere: 'lorafsafem ipsum blaboajsojas saf sfa fas fasfgaijgoajg afaoj foasf jafo afo afasd asff a',
            inStoc: 10,
            reducere: '10%',
        },
    ],
}

export default data;