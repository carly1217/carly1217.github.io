    //Key Generator
    function calculateNr(form) {
        var p = form.p.value;
        var q = form.q.value;
    
        var N = p * q;
        var r = (p - 1) * (q - 1);
        var ed = Candidates(r);
        
        displayValues(N, r); 
        return ""; 
    }
    
    function Candidates(r) {
        var n = 1;
        var line = "";
    
        for (var i = 1; i <= 25; i++) {
            n += r;
            if (i==25){
                line+=n;
            }
            else {
                line += n + ", ";
            }
        }
        return line;
    }
    
    function displayValues(N, r) {
        var NValue = document.getElementById("N_value");
        var rValue = document.getElementById("r_value");
        var edValue = document.getElementById("ed_value");
    
        NValue.textContent = N;
        rValue.textContent = r;
        edValue.textContent = "Candidates: " + Candidates(r);
    }


    function factor(number) {
        var factors = [];
    
        for (var i = 2; i <= Math.sqrt(number); i++) {
            while (number % i === 0) {
                factors.push(i);
                number /= i;
            }
        }
    
        if (number > 1) {
            factors.push(number);
        }
        var factorsString = factors.join(", ");
        return factorsString;
    }

    function CalculateED(form) {
        var k = parseInt(form.k.value); 
        var kFactorsElement = document.getElementById("k_factors");
        var factorsString = factor(k); 
        
        kFactorsElement.textContent = factorsString; 
        return "";
    }

    function gcd(a, b) {
        let smaller = Math.min(a, b);
        let gcd = 1;
         
        for (let i = 1; i <= smaller; i++) {
            if (a % i === 0 && b % i === 0) {
                gcd = i;
            }
        }
         
        return gcd;
        }

    function CheckED(form){
		var validator = ""
		var e = parseInt(form.e.value)
		var d = parseInt(form.d.value)
        var r = parseInt(document.getElementById("r_value").textContent)
		var N = parseInt(document.getElementById("N_value").textContent)
			
        validator += "e*d mod r = " + (e * d) % r + ", ";
    
        if (gcd(e, r) == 1) validator += "e and r are relatively prime, ";
        else validator += "e and r are not relatively prime; gcd(e,r) = " + gcd(e, r) + ", ";
    
        if (gcd(d, r) == 1) validator += "d and r are relatively prime";
        else validator += "d and r are not relatively prime; gcd(d,r) = " + gcd(d, r);

        var check = document.getElementById("check");
        check.textContent = validator;

        displayKeys(validator,e,d,N);
		return "";
	}

    function displayKeys(validator, e, d, N){
        if (validator == "e*d mod r = 1, e and r are relatively prime, d and r are relatively prime"){
            var public = document.getElementById("public");
            public.textContent = "The public key is ("+e+", "+N+")";
            var private = document.getElementById("private");
            private.textContent = "The private key is ("+d+", "+N+")";
        }

        else {
            var public = document.getElementById("public");
            public.textContent = "Choose new values for e and d.";
            var private = document.getElementById("private");
            private.textContent = "";
        
        }

    }

    // Encryption/Decryption

    function PowerMod(m, p, N) {
        var A = 1;
        var p = parseInt(p);
        var m = parseInt(m);
        var N = parseInt(N);
        
        while (p > 0) {
            if (p % 2 === 1) {
                A = (A * m) % N;
            }
            m = (m * m) % N;
            p = Math.floor(p / 2);
        }
        return A;
    }

    function encrypt(form) {
        var e = form.e1.value
		var N = form.N.value
		var M = form.m.value

        var encrypted = document.getElementById("encrypted");
        encrypted.textContent = PowerMod(M,e,N);

    }

    function decrypt(form) {
        var d = form.d1.value
		var N = form.N1.value
		var M = form.eM.value

        var decrypted = document.getElementById("decrypted");
        decrypted.textContent = PowerMod(M,d,N);

    }
