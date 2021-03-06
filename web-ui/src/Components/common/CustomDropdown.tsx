/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Reusuable/CustomDropdown.css';

interface CustomDropdownProps {
  setData: (position: any) => void;
  values: any[];
  title: string;
  logout: boolean;
  startAtEnd: boolean;
  updatePosition: string;
}

interface CustomDropdownState {
  dropDownOpen: boolean;
  value: string;
}

class CustomDropdown extends React.Component<CustomDropdownProps, CustomDropdownState> {
	static defaultProps = { logout: false, startAtEnd: false, updatePosition: '' };
	constructor (props: CustomDropdownProps) {
		super(props);
		this._toggleDropdown = this._toggleDropdown.bind(this);
		const { values } = this.props;

		if (values.length > 0) {
			this.state = {
				dropDownOpen: false,
				value: this.props.startAtEnd ? values[this.props.values.length - 1] : values[0]
			};
		} else {
			this.state = {
				dropDownOpen: false,
				value: ''
			};
		}
	}

	componentDidUpdate (prevProps:any) {
		if (prevProps.updatePosition !== this.state.value && prevProps.updatePosition.length > 0) {
			this.setState({ value: prevProps.updatePosition });
		}
	}

	_toggleDropdown () {
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen
		}));
	}

	_handleValueChange (position: string) {
		this.setState({ value: position });
		this.props.setData(position);
	}

	render () {
		const { values, title } = this.props;
		const { value, dropDownOpen } = this.state;
		const positionOptions = values.map(name => (
			<p
				className="custom-dropdown-menu-items"
				key={name}
			>
				<DropdownItem
					className={'custom-dropdown-menu-item-' + (name === value)}
					key={name}
					onClick={() => this._handleValueChange(name)}
					value={name}
				>
					{name}
				</DropdownItem>
			</p>
		));

		return (
			<div className="custom-dropdown">
				<Dropdown
					isOpen={dropDownOpen}
					toggle={this._toggleDropdown}
				>
					{this.props.logout ? null
						: <span
							className="bollocks"
							onClick={this._toggleDropdown}
						  >{title}:{' '}{value}</span>}

					<DropdownToggle
						caret
						className="custom-dropdown-menu-toggle"
					>
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="custom-dropdown-menu">{positionOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default CustomDropdown;
