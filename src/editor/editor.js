import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      text: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.selectedRecipe.id,
      title: this.props.selectedRecipe.title,
      text: this.props.selectedRecipe.body
    });
  };

  componentDidUpdate = () => {
    if (this.props.selectedRecipe.id !== this.state.id) {
      this.setState({
        id: this.props.selectedRecipe.id,
        title: this.props.selectedRecipe.title,
        text: this.props.selectedRecipe.body
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder="Recipe title..."
          value={this.state.title ? this.state.title : ''}
          onChange={e => this.updateTitle(e.target.value)}
        />
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }

  updateTitle = async val => {
    await this.setState({ title: val });
    this.update();
  };

  updateBody = async val => {
    await this.setState({ text: val });
    this.update();
  };

  update = debounce(() => {
    this.props.updateRecipe(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  }, 1000);
}

export default withStyles(styles)(EditorComponent);
