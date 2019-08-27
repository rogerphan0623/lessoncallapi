import React from 'react';
import callApi from '../../utils/apiCaller';
import {Link} from 'react-router-dom';

class ProductActionPage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            id:'',
            txtName:'',
            txtPrice:'',
            chkbStatus:''
        }
    }
    onSave=(e)=>{
        e.preventDefault();
       
        var {id,txtName,txtPrice,chkbStatus}=this.state;
       var {history}=this.props;
       if(id){
        callApi(`products/${id}`,'PUT',{name:txtName,price:txtPrice,status:chkbStatus}).then(res=>{
            history.goBack();
        })
       }else{
        callApi('products','POST',{name:txtName,price:txtPrice,status:chkbStatus}).then(res=>{
            history.goBack();
        })
    }
    }
    componentDidMount(){
        var {match}=this.props
        
        if(match){
            var id=match.params.id;
            console.log(id);
            callApi(`products/${id}`,'GET',null).then(res=>{
                console.log(res);
                var data=res.data;
                this.setState({
                    id:data.id,
                    txtName:data.name,
                    txtPrice:data.price,
                    chkbStatus:data.status
                })
            })
        }
    }
    onChange=(e)=>{
        console.log(e)
        var target=e.target;
        var name=target.name;
        var value=target.type=='checkbox'?target.checked:target.value;
        this.setState({
            [name]:value
        })
    }
    render() {
        var {txtName,txtPrice,chkbStatus}=this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                <form onSubmit={this.onSave}>
                    <legend>Form title</legend>

                    <div className="form-group">
                        <label>Tên Sản Phẩm: </label>
                        <input type="text" className="form-control" name='txtName' value={txtName} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Giá: </label>
                        <input type="number" className="form-control" name='txtPrice' value={txtPrice} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Trạng thái: </label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name='chkbStatus' value={chkbStatus} onChange={this.onChange} checked={chkbStatus}/>
                            Còn Hàng
                        </label>
                    </div>
<Link to='/product-list' className="btn btn-danger mr-10">Trở Lại</Link>
                    <button type="submit" className="btn btn-primary">Lưu lại</button>
                </form>

            </div>
        );
    }
}


export default (ProductActionPage);
