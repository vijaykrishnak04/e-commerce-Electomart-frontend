import Button from '../../components/Button';
import DataTable from '../../components/DataTable';



const Banner = () => {

    const columns = [
        { Header: 'No', accessor: 'id' },
        { Header: 'Banner Image', accessor: 'bannerImage' },
        { Header: 'Updated On', accessor: 'updatedOn' },
        { Header: 'Actions', accessor: 'Actions' },
        // Add more columns as needed
    ];

    const data = [
        { id: 1, bannerImage: 'Banner Image URL 1', updatedOn: '2024-01-23' ,Actions:"hello" },
    ];

    return (
        <>
            <div className='flex justify-between item-center p-4' >
                <h1 className="text-black text-2xl font-poppins font-Bold">Banners</h1>
                <Button className='px-5 py-2 font-poppins font-semibold text-opacity-10 rounded bg-yellow-50 hover:bg-yellow-40' text='Add Banner' />
            </div>

            <div className='mt-5 border  border-black p-5 rounded text-center mx-auto bg-white'>
                <DataTable columns={columns} data={data} />
            </div>

        </>
    )
}

export default Banner;