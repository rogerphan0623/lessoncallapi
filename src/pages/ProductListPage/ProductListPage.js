import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import callApi from '../../utils/apiCaller';
import {Link} from 'react-router-dom';
import {actFetchProductsReqest} from '../../actions/index';


class ProductListPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }
    componentDidMount(){
        this.props.fetchAllProducts();
    }
    onDelete=(id)=>{
        var {products}=this.props;
        callApi(`products/${id}`,'DELETE',null).then(res=>{
            console.log(res)
            if(res.status==200){
            var index=this.findIndex(products,id);
            if(index!==-1) {
                products.splice(index,1);
                console.log(products)
                this.setState({products:products})
            }
            }
        })
      }
    findIndex=(products,id)=>{
var result=-1;
products.forEach((product,index) => {
    if(product.id===id) result=index;
});
return result;
    }
    render() {
        //var {products} = this.props;
        var {products}=this.props;
        
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to='/product/add' className="btn btn-info mb-10">Thêm Sản Phẩm</Link>
               <ProductList>
                   {this.showProducts(products)}
               </ProductList>

            </div>
        );
    }
    showProducts(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return <ProductItem onDelete={this.onDelete} key={index} product={product} index={index} />
            })
        }
        return result;
    }
}
const mapStatetoProps=state=>{
    return {
        products: state.products
    }
}
const mapDispatchToProps=(dispatch,props)=>{
    return {
        fetchAllProducts:()=>{
            dispatch(actFetchProductsReqest())
        }
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(ProductListPage);
