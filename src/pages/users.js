import React, { Component } from 'react'
import { getForeignUser } from "../redux/actions/dataActions"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import NotFound from './notFound'
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Post from "../components/post";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { isAbsolute } from "path";
import dayjs from "dayjs";
import theTime from "dayjs/plugin/advancedFormat";

import { Redirect } from 'react-router-dom';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import Snackbar from '../components/snackbar';


//icons
import Location from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from '@material-ui/icons/Publish';

import { LinearProgress } from '@material-ui/core';

import Tooltip from "@material-ui/core/Tooltip";
import { height } from "@material-ui/system";
import { withSnackbar } from 'notistack';

import { loadMorePosts, getPosts } from '../redux/actions/dataActions'
import { Waypoint } from 'react-waypoint';



const styles = {
  paper: {
    padding: "20px"
  },

  left: {
    maxWidth: 300,
    display: "inline-flex",
    verticalAlign: "middle",
    lineHeight: 1.8
  },
  profilePosts: {
    marginTop: 20
  },
  icoMargin: {
    marginRight: 5
  },

  editIco: {
    display: "inline-flex",
    verticalAlign: "middle",
    lineHeight: 1.5,
    height: 20,
    marginLeft: 5
  }
};

export class users extends Component {





  loadMorePosts = () => {

    if (!this.props.data.noMore) this.props.loadMorePosts([], [], false);
  }



  componentDidMount() {
    let str = this.props.location.pathname;
    let arr = str.split("/");
    let loc = arr[2];
    if (arr[1] === "users" && arr[2] !== "logo192.png") this.props.getForeignUser(loc);

    console.log(loc);
    console.log(this.props.user.credentials.handle);

    if (loc === this.props.user.credentials.handle) {
      this.props.history.push('/user');
      console.log("redi");
    }

    if (!this.props.data.noMore) this.props.getPosts();


  }


  componentDidUpdate(prevProps) {




    if (!this.props.data.noMore && this.props.data.backupdata !== prevProps.data.backupdata && this.props.data.user) {
      let filtered = this.props.data.posts.filter(element => {
        return element.userHandle === this.props.data.user.handle
      })
      if (filtered.length <= 5) {
        console.log("from updejt")

        this.loadMorePosts();

      }
    }
  }

  render() {
    dayjs.extend(theTime);


    let str = this.props.location.pathname;
    let arr = str.split("/");
    let loc = arr[2];
    if (arr[1] === "users" && arr[2] !== "logo192.png") { loc = loc } else {
      loc = null;
    }





    let recentPostsMarkup = this.props.data.posts ? (
      this.props.data.posts.map(post =>
        (post.userHandle === loc) ?
          <Post key={post.postId} post={post} /> : null
      )
    ) : (
        null
      );

    const {
      classes,

      data: { user },



      UI: { loading },

    } = this.props;



    const profileMarkup = !this.props.data.loading && !this.props.UI.errors ? (

      <div class="main-content-squeezed">
        <Paper className={classes.paper}>
          <div className="profile-av">


            <div className="container1">

              <Avatar alt={
                this.props.data.user ? (this.props.data.user.handle) : null


              } src={

                this.props.data.user ? (this.props.data.user.imageUrl) : null




              } className="bigAvatar-scss" />


            </div>



            <Typography variant="h5"> {this.props.data.user ? (this.props.data.user.handle) : null}</Typography>

            <div className="profile-ainfo">
              <Typography className={classes.left} variant="body2">
                {" "}
                <Tooltip title="Location" placement="left">
                  <Location color="primary"></Location>
                </Tooltip>
                <div className={classes.icoMargin} /> {this.props.data.user ? (this.props.data.user.location) : null}{" "}
              </Typography>
              <br></br>

              <Typography className={classes.left} variant="body2">
                {" "}
                <Tooltip title="Account created" placement="left">
                  <EventIcon color="primary"></EventIcon>
                </Tooltip>
              </Typography>
              <br></br>

              <Typography className={classes.left} variant="body2">
                {" "}
                <Tooltip title="Reputation" placement="left">
                  <FireplaceIcon color="primary"></FireplaceIcon>
                </Tooltip>{" "}
                <div className={classes.icoMargin} /> {this.props.data.user ? (this.props.data.user.reputation) : null}{" "}
              </Typography>
            </div>
          </div>

          <Typography className="profile-bio" variant="body2">
            {" "}
            {this.props.data.user ? (this.props.data.user.bio) : null}{" "}
          </Typography>



        </Paper>

        <div className={classes.profilePosts}>

          {recentPostsMarkup}
          <div className="infinite-scroll-example__waypoint">
            {!this.props.data.noMore ? <Waypoint
              bottomOffset={0}
              scrollableAncestor="window"
              onEnter={
                this.loadMorePosts
              }
            /> : null}
            {!loading ? this.props.data.noMore ? null : (<div className="post-margin"><center>
              <LinearProgress color="primary" style={{ width: "100%" }} /></center></div>) : null}
          </div>

        </div>
      </div>


    ) : (
        (!this.props.UI.errors ? (<div class="main-content-squeezed">
          <LinearProgress color="primary" />
        </div>) : <NotFound />


        )


      )



    return profileMarkup;








  }

}


users.propTypes = {

  data: PropTypes.object.isRequired,

  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getForeignUser: PropTypes.func.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onEnter: PropTypes.func,
  bottomOffset: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  scrollableAncestor: PropTypes.any,
};
const mapStateToProps = state => ({
  data: state.data,

  UI: state.UI,
  user: state.user
});

const mapActionsToProps = {
  getForeignUser, loadMorePosts, getPosts
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(users));







