<?php
    include_once('header.php');

    $sessionCode = $kipbingo->getSession();
    $kipbingo->getList($sessionCode);
?>

<div class="container">
    <div>
        <img src="/images/bingo-header.png" class="header">
        <div class='table'>
            <?php
                $kipbingo->displayGrid();
            ?>
        </div>

        <div class="save">
            Save code: <span id="save-code"></span>
            <div id="copied">Copied!</div>
        </div>
    </div>
</div>

<script>
    const cells = document.getElementsByClassName('cell-wrapper');
    textFit(cells, {
        detectMultiLine: true,
        multiLine: true,
    });

    const emotes = JSON.parse('<?= $kipbingo->getEmotes(); ?>');
    emotes.forEach((emote) => {
        let img = new Image();
        img.src = emote.images.url_4x;
    });

    function getRandomEmote() {
        let randomInt = Math.floor(Math.random() * (emotes.length));
        return emotes[randomInt].images.url_4x;
    }

    let saveCode = '<?= $sessionCode; ?>';
    let saveCodeArr = saveCode.split('-');
    saveCodeArr.forEach((code) => {
        if (code.includes('a')) {
            code = code.replace('a', '');
            let cell = document.querySelector(`.cell-wrapper[data-id='${code}']`);
            cell.classList.add('ticked');
            cell.querySelector('.cell-bg').style.backgroundImage = `url('${getRandomEmote()}')`;
        }
    });
    const saveCodeContainer = document.getElementById('save-code');
    saveCodeContainer.innerText = saveCode;
</script>