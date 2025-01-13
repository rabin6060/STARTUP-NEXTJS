

export const STARTUP_QUERIES = {
    startupLists:`*[_type=='startup' && defined(slug.current) && !defined($search) || title match $search || category match $search  ]{
  title,
    author->{_id,name,email},
    image,
    description,
    category,
    _createdAt,
    views,
    _id
}`,
    singleStartup:`*[_type=='startup' && _id==$id][0]{
  title,
    author->{_id,name,email,image,username},
    image,
    description,
    category,
    _createdAt,
    pitch
}`,
  fetchViews:`*[_type=='startup' && _id==$id][0]{
 _id,views
}`,
  fetchUserByGithubId:`*[_type=='author' && id==$id][0]{
    _id,
    id,
    name,
    email,
    image,
    username,
    bio
  }`,
  fetchUserById:`*[_type=='author' && _id==$id][0]{
    _id,
    id,
    name,
    email,
    image,
    username,
    bio
  }`
  ,
  startups_by_user:`*[_type=='startup' && author._ref==$id]|order(_createdAt desc){
    title,
      author->{_id,name,email,image,username},
      image,
      description,
      category,
      _createdAt,
      pitch
  }`,
 
}