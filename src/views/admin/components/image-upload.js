import React, { Component, PropTypes } from 'react';
import LoaderAnim from './loader.gif';
import './image-upload.css';

export default class ImageUpload extends Component {
	
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		onSuccess: PropTypes.func.isRequired,
		onFail: PropTypes.func.isRequired,
		onCancel: PropTypes.func.isRequired
	};
	
	state = {
		showOptions: false,
		active: false
	};
	
	selectImage = () => {
		this.fileInput.click();
	};
	
	onInputChange = () => {
		const input = this.fileInput;
		const hasFile = input.files.length > 0;
		
		if (hasFile) {
			let reader = new FileReader();
			reader.onload = (evt) => {
				this.setState({
					showOptions: true
				});
				this.props.onChange(evt.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		} else {
			this.props.onChange(null);
		}
	};
	
	upload = () => {
		this.onStart();
		
		let formData = new FormData();
		formData.append('image', this.fileInput.files[0]);
		
		const payload = {
			method: 'POST',
			body: formData
		};
		
		fetch('http://www.emmahollanddesign.com/images/artwork/index.php', payload)
			.then(this.onUploadResponse)
			.then(this.onUploadSuccess)
			.catch(this.onUploadFail);
	};
	
	// Parse and handle response - throw errors to be handled in catch block
	onUploadResponse = (response) => {
		if (response.status < 200 || response.status >= 300) {
			throw new Error(response.statusText);
		}
		
		return response.json();
	};
	
	onUploadSuccess = (result) => {
		// check for script errors
		if (result.status === 1) {
			this.props.onSuccess(result);
			this.onFinish();
			return;
		}
		
		throw new Error(result.errorText);
	};
	
	onUploadFail = (err) => {
		this.setState({
			active: false,
			error: err.message
		});
	};
	
	reset = () => {
		this.onFinish();
		this.fileInput.value = null;
		this.props.onCancel();
	};
	
	onStart () {
		this.setState({
			active: true
		});
	}
	
	onFinish () {
		this.setState({
			active: false,
			showOptions: false
		});
	}
	
	getDialog () {
		if (this.state.showOptions) {
			return this.state.error ? this.getErrorDialog() : this.getSaveDialog();
		}
	}
	
	getSaveDialog () {
		return (
			<div className="saveDialog">
				<h4>Save Changes?</h4>
				{ this.state.active && <img role="presentation" src={LoaderAnim}/> }
				{ !this.state.active && (
					<div className="options">
						<button className="red" onClick={this.reset}>Cancel</button>
						<button className="green" onClick={this.upload}>Save</button>
					</div>
				)
				}
			</div>
		);
	}
	
	getErrorDialog () {
		return (
			<div className="errorDialog">
				<h4>Upload Error</h4>
				<p>{this.state.error}</p>
				<button className="green" onClick={this.dismissError}>Ok</button>
			</div>
		);
	}
	
	dismissError = () => {
		this.setState({
			showOptions: false,
			error: undefined
		});
		this.props.onFail();
	};
	
	render () {
		return (
			<div className="image-upload">
				<label>Image: </label>
				<input type="file" name="image" accept="image/jpg, image/png"
				       onChange={this.onInputChange} ref={(el) => this.fileInput = el}/>
				<button onClick={this.selectImage}>Change image</button>
				{ this.getDialog() }
			</div>
		);
	}
}
