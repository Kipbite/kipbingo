<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/images/pog.png">
    <title>Kipyu Bingo!</title>
    <link href="style.css?v=<?= time(); ?>" rel="stylesheet">
    <script src="textFit.min.js"></script>
</head>
<body>

    <?php
        include_once('kipbingo.class.php');
        $kipbingo = new kipbingo;

        if (!empty($_GET['savecode'])) {
            $kipbingo->getList($_GET['savecode']);
        } elseif (!empty($_COOKIE['savecode'])) {
            $kipbingo->getList($_COOKIE['savecode']);
        } else {
            $kipbingo->getList();
        }
    ?>

    <div class="container">
        <div>
            <img src="/images/bingo-header.png" class="header">
            <div class='table'>
                <?php
                    $kipbingo->displayGrid();
                ?>
            </div>

            <div class="buttons">
                <img class="btn" id="new" src="/images/new.png" alt="new">
                <img class="btn" id="shuffle" src="/images/shuffle.png" alt="shuffle">
            </div>
        </div>

        <div class="possibilities">
            <img src="/images/possibilities.png" class="header">
            <ul>
                <?php
                    $kipbingo->displayList();
                ?>
            </ul>

            <form id="new-option">
                <input type="text" name="new" id="new-option-input" placeholder="add something new!"></input>
                <button><img src="/images/pog.png" class="pog"></button>
            </form>

            <div class="save">
                Save code: <span id="save-code"></span>
                <div id="copied">Copied!</div>
            </div>
        </div>
    </div>

    <script>
        const newOptionForm = document.getElementById('new-option');

        newOptionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let item = document.getElementById('new-option-input').value;

            if (item) {
                let formData = new FormData();
                formData.append('item', item);

                fetch('/new-possibility.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                })
                    .then((response) => {
                        location.reload();
                    })
            }
        })

        const cells = document.getElementsByClassName('cell-wrapper');
        textFit(cells, {
            detectMultiLine: true,
            multiLine: true,
        });

        const cookies = Object.fromEntries(
            document.cookie.split('; ').map((entry) => entry.split('='))
        );

        const lockButtons = document.getElementsByClassName('lock');
        const saveCodeContainer = document.getElementById('save-code');
        const newButton = document.getElementById('new');
        const shuffleButton = document.getElementById('shuffle');
        let saveCode = '<?= $kipbingo->getSaveCode(); ?>';
        let lockedEntries = cookies.locked ? cookies.locked.split('-') : [];

        document.cookie = `savecode=${saveCode}; path=/;`;
        saveCodeContainer.innerText = saveCode;

        saveCodeContainer.addEventListener('click', () => {
            navigator.clipboard.writeText(saveCodeContainer.innerText);
            document.getElementById('copied').classList.add('show');
            setTimeout(() => {
                document.getElementById('copied').classList.remove('show');
            }, 1000)
        });

        shuffleButton.addEventListener('click', () => {
            let saveCodeArr = saveCode.split('-');
            for (let i = saveCodeArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = saveCodeArr[i];
                saveCodeArr[i] = saveCodeArr[j];
                saveCodeArr[j] = temp;
            }

            saveCode = saveCodeArr.join('-');
            document.cookie = `savecode=${saveCode};`;
            window.location = "/";
        });

        newButton.addEventListener('click', () => {
            if (lockedEntries.length > 0) {
                document.cookie = `savecode=${lockedEntries.join('-')};`;
                document.cookie = `locked=${lockedEntries.join('-')};`;
            } else {
                document.cookie = `savecode=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                document.cookie = `locked=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            }

            window.location = "/";
        });

        for (let i = 0; i < lockButtons.length; i++) {
            let entry = lockButtons[i];

            if (lockedEntries.includes(entry.dataset.id)) {
                entry.src = "/images/locked.png";
                entry.classList.add('locked');
                entry.classList.remove('unlocked');
            }

            entry.addEventListener('click', () => {
                if (entry.classList.contains('unlocked')) {
                    lockedEntries.push(entry.dataset.id);
                    entry.src = "/images/locked.png";
                    entry.classList.add('locked');
                    entry.classList.remove('unlocked');
                } else {
                    let index = lockedEntries.indexOf(entry.dataset.id);
                    index > -1 ? lockedEntries.splice(index, 1) : null;
                    entry.src = "/images/unlocked.png";
                    entry.classList.add('unlocked');
                    entry.classList.remove('locked');
                }

                if (lockedEntries.length > 0) {
                    document.cookie = `locked=${lockedEntries.join('-')};`;
                } else {
                    document.cookie = `locked=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                }
            });
        };
    </script>
</body>
</html>