'use strict';

function LikeButton() {
    const [liked, setLIked] = React.useState(false);

    if (liked) {
        return 'You liked this!';
    }

    return React.createElement(
        'button',
    {
        onClick: () => setLIked(true),
    },
    'Like'
    );
}

const rootNode = document.getElementById('like-button-root')
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(LikeButton));