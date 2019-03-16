import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './LabelValue.scss'

const LabelValue = (props) => {
  const classNames = classnames(
    'LabelValue',
    { loading: props.isLoading },
  )

  return (
    <div className={classNames}>
      <div className="LabelValue-label">
        {props.label}
      </div>
      <div className="LabelValue-value">
        {props.children}
      </div>
    </div>
  )
}

LabelValue.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
}

LabelValue.defaultProps = {
  children: null,
  isLoading: false,
  label: '',
}

export default LabelValue
