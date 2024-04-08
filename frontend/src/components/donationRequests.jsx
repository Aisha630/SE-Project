import React from 'react'

const DonationRequests = ({ product }) => {
    console.log(product)
    return (
        <div>
            <div>
                {product.requestList.length > 0 &&
                    <span> Requesters are:  {product.requestList.map(requester => <div>{requester}</div>)}
                    </span>
                }
                {product.requestList.length === 0 && <div> No requesters yet</div>}
            </div>
            <div>

                shakalaboomboom
            </div>
        </div>
    )
}

export default DonationRequests