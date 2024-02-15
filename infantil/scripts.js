document.addEventListener("DOMContentLoaded", function() {
    const addFilhoBtn = document.getElementById("addFilhoBtn");
    const enviarBtn = document.getElementById("enviarBtn");
    const filhosContainer = document.getElementById("filhosContainer");

    addFilhoBtn.addEventListener("click", function() {
        const filhoDiv = document.createElement("div");
        filhoDiv.innerHTML = `
            <label for="filhoNome">Nome do Filho:</label>
            <input type="text" name="filhoNome" required>
            <label for="filhoDataNascimento">Data de Nascimento do Filho:</label>
            <input type="date" name="filhoDataNascimento" required>
            <label for="filhoAlergia">Alergia:</label>
            <input type="text" name="filhoAlergia">
        `;
        filhosContainer.appendChild(filhoDiv);
    });

    enviarBtn.addEventListener("click", function() {
        var resp1Nome = document.getElementById("resp1Nome").value;
        var resp1Telefone = document.getElementById("resp1Telefone").value;
        var resp2Nome = document.getElementById("resp2Nome").value;
        var resp2Telefone = document.getElementById("resp2Telefone").value;

        var filhos = [];
        var filhosInputs = document.getElementsByName("filhoNome");
        var filhosDataNascimento = document.getElementsByName("filhoDataNascimento");
        var filhosAlergia = document.getElementsByName("filhoAlergia");

        for (var i = 0; i < filhosInputs.length; i++) {
            var filho = {
                nome: filhosInputs[i].value,
                dataNascimento: filhosDataNascimento[i].value,
                alergia: filhosAlergia[i].value
            };
            filhos.push(filho);
        }

        var formData = {
            resp1Nome: resp1Nome,
            resp1Telefone: resp1Telefone,
            resp2Nome: resp2Nome,
            resp2Telefone: resp2Telefone,
            filhos: filhos
        };

        fetch('https://script.google.com/macros/s/AKfycbyh1vP-J_wYbEkFniJC8UKP6CpzoaUSpEpcqcmu_jD4vSNVdV4bIr9ZwtbHRYCwQxwD/exec', {
            method: 'POST',
            body: JSON.stringify(formData)
        }).then(function(response) {
            if (response.ok) {
                alert("Dados enviados com sucesso!");
                document.getElementById("cadastroForm").reset();
                filhosContainer.innerHTML = ''; // Limpa os filhos adicionados dinamicamente
            } else {
                alert("Ocorreu um erro ao enviar os dados.");
            }
        }).catch(function(error) {
            console.error('Houve um problema com a solicitação fetch:', error);
        });
    });
});
