import React from 'react';
import PropTypes from 'prop-types';
import NavbarButton from '../../../util/NavbarButton';
import { Link } from 'react-router-dom';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../../redux/actions/dataActions';


const LikeButton = (props) => {

  const { screamId } = props;
  const { authenticated, likes } = props.user;

  const likedScream = () => {
    if (
      likes &&
      likes.find(
        (like) => like.screamId === props.screamId
      )
    )
      return true;
    else return false;
  };

  const likeScream = () => {
    props.likeScream(screamId);
  };

  const unlikeScream = () => {
    props.unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <NavbarButton tip="Like">
        <FavoriteBorder color="primary" />
      </NavbarButton>
    </Link>
  ) : likedScream() ? (
    <NavbarButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </NavbarButton>
  ) : (
    <NavbarButton tip="Like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </NavbarButton>
  );

  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
