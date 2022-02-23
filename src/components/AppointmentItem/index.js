import './index.css'

const AppointmentItem = props => {
  const {details, onClickStar} = props
  const {id, name, date, isStarred} = details
  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickButton = () => {
    onClickStar(id)
  }

  return (
    <li className="list" key={id}>
      <div className="name-star">
        <p className="appointment-name">{name}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickButton}
          testid="star"
        >
          <img src={starUrl} alt="star" />
        </button>
      </div>
      <p className="date-time-day">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
