import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Link,
} from '@mui/material';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            component={RouterLink}
            to={`/users/${post.author}`}
            sx={{ bgcolor: 'primary.main', textDecoration: 'none' }}
          >
            {post.authorInfo?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
        }
        title={
          <Link component={RouterLink} to={`/users/${post.author}`} underline="hover">
            {post.authorInfo?.name || 'Unknown User'}
          </Link>
        }
        subheader={formatDate(post.createdAt)}
      />
      <CardContent>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
