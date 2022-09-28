interface ReceiptCard {
    index: number;
    title: string;
}

export const ReceiptCard = (props: ReceiptCard) => {
    const { index, title } = props;
    return (
        <div className="card col-12 px-0 w-100 ms-0 my-1" key={index}>
            <div
                className="card-header w-100 p-0 bg-white"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseReceipt${index + 1}`}
                aria-expanded="false"
                aria-controls={`collapseReceipt${index + 1}`}>
                <div className='w-100 my-1 ms-0'>
                    <span className="ps-3 py-2"> Method: {title}</span>
                </div>
            </div>
            <div className='card-body collapse py-1 row' id={`collapseReceipt${index + 1}`}>
                <div className='col-4'>txHash: {"asdf"}</div>
                <div className='col-12'>seller address: {"0x64469e021f23353a3e0757bc4d211a6f9756d37a"}</div>
                <div className='col-12'>buyer address: {"0x04c1499f9fa23668c08c5322992a8e9bba709ede"}</div>
            </div>
        </div>
    );
}