// src/components/AuthorInfo.tsx
import React, { Component } from "react";

type AuthorInfoProps = {
  name: string;
  bio: string;
  topBooks: string[];
};

class AuthorInfo extends Component<AuthorInfoProps> {
  componentDidMount() {
    console.log(`Loading details for author: ${this.props.name}`);
  }

  render() {
    const { name, bio, topBooks } = this.props;

    return (
      <div className="card mt-3 p-3 shadow-sm">
        <h4>{name}</h4>
        <p>{bio}</p>
        <h6>Top 3 Books:</h6>
        <ul>
          {topBooks.map((book, i) => (
            <li key={i}>{book}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorInfo;
