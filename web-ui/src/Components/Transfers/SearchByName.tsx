import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import '../../Style/Transfers/SearchByName.css';

interface State {
  searchByValue: string;
}

interface PositionDropdownProps {
  setSearchByName: (searchByName: string) => void;
}
class SearchByName extends React.Component<PositionDropdownProps, State> {
	constructor (props: PositionDropdownProps) {
		super(props);
		this.state = {
			searchByValue: ''
		};
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.props.setSearchByName(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<State, keyof State>); // Needs type conversion, see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
	}

	render () {
		return (
			<div className="transfers-search-player-form-outer" onSubmit={ e => e.preventDefault() }>
				<Form id="transfers-search-by-name-form">
					<div id="login-input-fields">
						<FormGroup>
							<Label for="searchByValue" className="unselectable">
                Player name
							</Label>
							<Field
								type="text"
								name="searchByValue"
								id="searchByValue"
								component="input"
								onChange={ e => this._handleInput(e!.target.name, e!.target) }
							/>
						</FormGroup>
					</div>
				</Form>
			</div>
		);
	}
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(SearchByName)
);
