import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
        if (comments != null) {
            const commentList = comments.map(comment => {
                return (
                <div>
                    <ul className="list-unstyled">
                        <li key={comment.id}>
                        <p> {comment.comment} </p>
                        <p>-- {comment.author}, <span> </span>
                        {new Intl.DateTimeFormat('en-US', 
                            {   year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))} </p>
                        </li>
                    </ul>
                </div>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                        <div>
                            {commentList}
                        </div>
                        <CommentForm />
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    const Dishdetail = (props) => {
        if (props.dish != null) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />                    
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            );
        } else {
            return(
                <div></div>
            );
        }
      }

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {     
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit(values) {
        this.toggleModal();
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return(
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating" >Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" validators={{isNumber}} >
                                    <option>Choose Rating</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author" >Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                                <Errors className="text-danger" model=".author" show="touched" messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment" >Comment</Label>
                                <Control.textarea model=".comment" name="comment" rows="6" className="form-control" />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}      

export default Dishdetail; 