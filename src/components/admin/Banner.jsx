import Button from '../../components/Button'

const Banner = () => {
    return (
        <>
        <div className='flex justify-between item-center p-4 ' >
            <h1 className="text-black text-2xl font-poppins font-Bold">Banners</h1>
            <Button className='px-5 py-2 font-poppins font-semibold text-opacity-10 rounded bg-yellow-50 hover:bg-yellow-40' text='Add Banner'/>
        </div>
        
        </>
    )
}

export default Banner;