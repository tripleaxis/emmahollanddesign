import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './tag-display.less';

class TagDisplay extends Component {
  
  static propTypes = {
    selectedTags: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
  };
  
  toggleSelected(tag) {
    let newTags = this.props.selectedTags.slice().split(/,\s?/);
    let tagIdx = newTags.indexOf(tag);
    if (tagIdx === -1) {
      newTags.push(tag);
    } else {
      newTags.splice(tagIdx, 1);
    }
    
    this.props.onChange(newTags.join(','));
  }
  
  render() {
    let selectedTags = this.props.selectedTags.split(/,\s?/);
    
    return (
      <ul className="tag-display">
        {
          this.props.tags.map((tag, idx) => {
            let selected = selectedTags.includes(tag) ? 'selected' : '';
            return (
              <li key={idx} className={`tag ${selected}`} onClick={this.toggleSelected.bind(this, tag)}>
                <span>{tag}</span>
                {/*<span className="selected-icon">✔</span>*/}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  const { tags } = state;
  return { tags };
};

export default connect(mapStateToProps)(TagDisplay);

