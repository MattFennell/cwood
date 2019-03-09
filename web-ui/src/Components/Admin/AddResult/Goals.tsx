import * as React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

interface GoalsState {
  goals: string;
}

interface GoalsProps {
  goals: (goals: string) => void;
  wording: string;
}
class Goals extends React.Component<GoalsProps, GoalsState> {
	constructor (props: GoalsProps) {
		super(props);
		this.state = {
			goals: ''
		};
	}

	_handleInput (eventName: string, eventTarget: HTMLInputElement) {
		this.props.goals(eventTarget.value);
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<GoalsState, keyof GoalsState>);
	}

	render () {
		return (
			<div
				className="add-result-goals-form-outer"
				onSubmit={e => e.preventDefault()}
			>
				<Form id="add-result-goals-form">
					<div id="login-input-fields">
						<FormGroup>
							<Label
								className="unselectable"
								for="goals"
							>
                Goals {this.props.wording} :
							</Label>
							<Field
								component="input"
								id={this.props.wording}
								name={this.props.wording}
								onChange={e => this._handleInput(e!.target.name, e!.target)}
								type="text"
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
	})(Goals)
);
