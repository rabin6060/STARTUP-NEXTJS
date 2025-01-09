

export const STARTUP_QUERIES = {
    startupLists:`*[_type=='startup' && defined(slug.current) && !defined($search) || title match $search || category match $search  ]{
  title,
    author->{name,email},
    image,
    desciption,
    category,
    _createdAt,
    views,
    _id
}`
}