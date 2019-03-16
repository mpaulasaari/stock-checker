import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './LabelValue.scss'

const LabelValue = ({
  children,
  isLoading,
  label,
}) => {
  const classNames = classnames(
    'LabelValue',
    { loading: isLoading },
  )

  return (
    <div className={classNames}>
      <div className="LabelValue-label">
        {label}
      </div>

      <div className="LabelValue-value">
        {children}
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
