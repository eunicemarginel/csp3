import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ product, isActive, fetchData }) {

  const archiveToggle = (productId) => {
    fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Product archived successfully') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Product successfully disabled'
          });
          fetchData(); // Update product list after archiving
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to archive product. Please try again.'
        });
        console.error('Error archiving product:', error);
      });
  };

  const activateToggle = (productId) => {
    fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Product activated successfully') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Product successfully enabled'
          });
          fetchData(); // Update product list after activation
        } else {
          throw new Error('Something went wrong');
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to activate product. Please try again.'
        });
        console.error('Error activating product:', error);
      });
  };

  return (
    <>
      {isActive ?
        <Button variant="danger" size="sm" onClick={() => archiveToggle(product._id)}>Archive</Button>
        :
        <Button variant="success" size="sm" onClick={() => activateToggle(product._id)}>Activate</Button>
      }
    </>
  );
}


// import { Button } from 'react-bootstrap';
// import Swal from 'sweetalert2';

// export default function ArchiveProduct({product, isActive, fetchData}) {

// 	const archiveToggle = (productId) => {
// 		fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}/archive`, {
// 			method: 'PATCH',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`
// 			}
// 		})

// 		.then(res => res.json())
// 		.then(data => {
// 			console.log(data)
// 			if(data.message === 'Product archived successfully') {
// 				Swal.fire({
// 					title: 'Success',
// 					icon: 'success',
// 					text: 'Product successfully disabled'
// 				})
// 				fetchData();

// 			}else {
// 				Swal.fire({
// 					title: 'Something Went Wrong',
// 					icon: 'Error',
// 					text: 'Please Try again'
// 				})
// 				fetchData();
// 			}


// 		})
// 	}


// 	const activateToggle = (productId) => {
// 		fetch(`http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/products/${productId}/activate`, {
// 			method: 'PATCH',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`
// 			}
// 		})

// 		.then(res => res.json())
// 		.then(data => {
// 			console.log(data)
// 			if(data.message === "Product activated successfully") {
// 				Swal.fire({
// 					title: 'Success',
// 					icon: 'success',
// 					text: 'Product successfully enabled'
// 				})
// 				fetchData();
// 			}else {
// 				Swal.fire({
// 					title: 'Something Went Wrong',
// 					icon: 'Error',
// 					text: 'Please Try again'
// 				})
// 				fetchData();
// 			}


// 		})
// 	}


// 	return(
// 		<>
// 			{isActive ?

// 				<Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>

// 				:

// 				<Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

// 			}
// 		</>

// 	)
// }