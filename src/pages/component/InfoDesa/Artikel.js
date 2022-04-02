import React from 'react';

const Artikels = ({ artikel, loading,  search, moment }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="row">
            {artikel?.map((artikel, index) => (
                <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                    <div className="whats-news-single mb-40 mb-40">
                        <div className="whates-img">
                            <img src={"http://localhost:8000/" + artikel.image} style={{ height: 180 }} />
                        </div>
                        <div className="whates-caption whates-caption2">
                            <h4><a href={`/detail/${artikel.id}`}>{artikel.nama_artikel}</a></h4>
                            <span>Di Update {moment(artikel.updated_at).fromNow()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
  );
};

export default Artikels;