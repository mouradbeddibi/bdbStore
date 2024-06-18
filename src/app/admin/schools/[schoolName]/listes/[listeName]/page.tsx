import React from 'react';
import EditListeForm from './editListeForm';
import { getListeWithItemsAndProducts, getProducts } from '@/lib/prismaUtils';

export const dynamic = "force-dynamic";

async function page({ params }: { params: { listeName: string, schoolName: string } }) {
    const products = await getProducts();
    const ListeWithItemsAndProducts = await getListeWithItemsAndProducts(params.listeName);
    const initlisteItems = ListeWithItemsAndProducts.items;

    const initdisplayListeItems = initlisteItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
    }));

    return (
        <div className='m-4'>
            <EditListeForm
                listeName={params.listeName}
                products={products}
                schoolName={params.schoolName}
                initdisplayListeItems={initdisplayListeItems}
                initlisteItems={initlisteItems}
                displayListeName={ListeWithItemsAndProducts.liste.listName}
                isVisible={ListeWithItemsAndProducts.liste.isVisible}
            />
        </div>
    );
}

export default page;
