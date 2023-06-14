'use strict'

import '../css/style.css';
import csvData from '../severity_assessment.csv'

import img_logo_VUB from "../img/logo_onderzoek.jpg";
import icon_logo_VUB from "../img/vub_sponsor_logo_digitaal.jpg";
import logo_norecopa from "../img/references/logo_norecopa.jpg";


// console.clear();
console.log("js successfully coupled")

//NAVIGATION
    //  Header met navigatie verdwijnt bij naar beneden scrollen en verschijnt weer na omhoog scrollen
    let beginP = window.scrollY
    let nav = document.getElementsByTagName('nav');

    window.addEventListener('scroll', function () {
        let curP = window.scrollY

    if(curP > beginP)
    {
        nav[0].classList.add('hidden')

        beginP = curP
        
    }
    else{
        nav[0].classList.remove('hidden')
    }
    beginP = curP
    })




//MAIN
window.addEventListener('DOMContentLoaded', () => {
   
    fetch(csvData)
    .then(response => response.text())
    .then(csvData => {
        //split lines of data, store in 'lines' and assign headers based on first line
      const lines = csvData.split('\n');
      const headers = lines[0].split(';');

        //remove the first line and add the remaining lines as values
      const procedures = lines.slice(1).map(line => {
        const values = line.split(';');
        const procedure = {};

        headers.forEach((header, index) => {
          procedure[header] = values[index];
        });

        return procedure;
      });

      // Now you have an array of procedure objects
      console.log(procedures);

      

// Get the select elements and options containers
        const selectTypeElement = document.getElementById('procedure-select');
        const modelOptionsContainer = document.getElementById('model-options');
        const subtypeOptionsContainer = document.getElementById('subtype-options');
        const clinicalSymptomsOptionsContainer = document.getElementById('symptoms-options');
        const durationOptionsContainer = document.getElementById('duration-options');
        const clearButton = document.getElementById('reset')



//set procedure type 
        
        // Generate options based on procedure types
        const procedureTypes = procedures.map(procedure => procedure.type);

        const uniqueProcedureTypes = [...new Set(procedureTypes)];

        uniqueProcedureTypes.forEach(type => {
            if(type !== undefined && type !== '' ){
                const option = document.createElement('option');
                option.textContent = type;
                option.value = type;
                selectTypeElement.appendChild(option);
            }

        });
        

//set Model options 
    
      // Event listener for procedure type selection
      selectTypeElement.addEventListener('change', () => {
        
        // Clear previous options
        modelOptionsContainer.innerHTML = '';
        subtypeOptionsContainer.innerHTML = '';
        clinicalSymptomsOptionsContainer.innerHTML = '';
        durationOptionsContainer.innerHTML = '';

        //clear results section
        clearResultsCont()

        // Get the selected procedure type
        const selectedType = selectTypeElement.value;

        // Filter procedures based on the selected type
        const filteredProcedures = procedures.filter(procedure => procedure.type === selectedType);

        // Extract unique values from all columns of filtered procedures
        const uniqueModels = [...new Set(filteredProcedures.map(procedure => procedure.model))];
        const uniqueSubtypes = [...new Set(filteredProcedures.map(procedure => procedure.subcategory))];
        const uniqueClinicalSymptoms = [...new Set(filteredProcedures.map(procedure => procedure.clinicalSymptoms))];
        const uniqueDurations = [...new Set(filteredProcedures.map(procedure => procedure.duration))];

        //display submit button?
        displayGetSeverityButton()

        // Generate radio buttons for unique models
        if(uniqueModels[0] !="" && selectedType !== uniqueModels[0]){

            //create a title for the model container
            let title = document.createElement('h3');
            title.textContent = 'Model'
            modelOptionsContainer.appendChild(title)

            uniqueModels.forEach(model => {
            const radioContainer = document.createElement('div');
            radioContainer.setAttribute('class', 'radioContainer')

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'model';
            radioInput.value = model;
            radioInput.id = model;

            const radioLabel = document.createElement('label');
            radioLabel.textContent = model;
            radioLabel.setAttribute('for', model);

            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(radioLabel);

            modelOptionsContainer.appendChild(radioContainer);
            });
        }else{ //if the models are empty, check if there is anything else defined

            if(uniqueSubtypes[0] !=""){

                //create a title for the subtypes container
                let title = document.createElement('h3');
                title.textContent = 'Subtype'
                subtypeOptionsContainer.appendChild(title)

                uniqueSubtypes.forEach(subtype => {
                const radioContainer = document.createElement('div');
                radioContainer.setAttribute('class', 'radioContainer')
    
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'subtype';
                radioInput.id = subtype;
                radioInput.value = subtype;
    
                const inputLabel = document.createElement('label');
                inputLabel.textContent = subtype;
                inputLabel.setAttribute('for', subtype)
    
                radioContainer.appendChild(radioInput);
                radioContainer.appendChild(inputLabel);
    
                subtypeOptionsContainer.appendChild(radioContainer);
            });
            }else{ //if subtypes are empty, check if there are clinical symptoms or subcategories
                if(uniqueClinicalSymptoms[0] !=""){

                    //create a title for the clinical signs container
                    let title = document.createElement('h3');
                    title.textContent = 'Clinical signs'
                    clinicalSymptomsOptionsContainer.appendChild(title)

                    uniqueClinicalSymptoms.forEach(symptom => {
                    const radioContainer = document.createElement('div');
                    radioContainer.setAttribute('class', 'radioContainer')
        
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'symptom';
                    radioInput.id = symptom;
                    radioInput.value = symptom;
        
                    const inputLabel = document.createElement('label');
                    inputLabel.textContent = symptom;
                    inputLabel.setAttribute("for", symptom)
        
                    radioContainer.appendChild(radioInput);
                    radioContainer.appendChild(inputLabel);
        
                    clinicalSymptomsOptionsContainer.appendChild(radioContainer);
                    });
                }else{ //if the cliniczl symptoms are emtpy, check if there are durations
                    if(uniqueDurations[0] !=""){
                        
                        //create a title for the model container
                        let title = document.createElement('h3');
                        title.textContent = 'Model'
                        durationOptionsContainer.appendChild(title)
                        
                        uniqueDurations.forEach(duration => {
                        const radioContainer = document.createElement('div');
                        radioContainer.setAttribute('class', 'radioContainer')
            
                        const radioInput = document.createElement('input');
                        radioInput.type = 'radio';
                        radioInput.name = 'duration';
                        radioInput.id = duration;
                        radioInput.value = duration;
            
                        const inputLabel = document.createElement('label');
                        inputLabel.textContent = duration;
                        inputLabel.setAttribute("for", duration)
            
                        radioContainer.appendChild(radioInput);
                        radioContainer.appendChild(inputLabel);
            
                        durationOptionsContainer.appendChild(radioContainer);
                        });
                    }
                }
            }
        }
      });



//set subtype options
      // Event listener for model selection
      modelOptionsContainer.addEventListener('change', () => {
        // Clear previous options
        subtypeOptionsContainer.innerHTML = '';
        clinicalSymptomsOptionsContainer.innerHTML = '';
        durationOptionsContainer.innerHTML = '';

        //clear results section
        clearResultsCont()

        // Get the selected model and type
        const selectedType = selectTypeElement.value;
        
        let selectedModel='';  //need to do try catch because sometimes there is no model selected (model is same as type)
        try {
            selectedModel = modelOptionsContainer.querySelector('input[name="model"]:checked').value;
        } catch (error) {
            selectedModel = selectTypeElement.value;
        }
        

        // Filter procedures based on the selected type and model
        const filteredProcedures = procedures.filter(procedure => procedure.type === selectedType && procedure.model ===selectedModel);

        // Extract unique values from all columns of filtered procedures
        const uniqueSubtypes = [...new Set(filteredProcedures.map(procedure => procedure.subcategory))];
        const uniqueClinicalSymptoms = [...new Set(filteredProcedures.map(procedure => procedure.clinicalSymptoms))];
        const uniqueDurations = [...new Set(filteredProcedures.map(procedure => procedure.duration))];


        //display submit button?
        displayGetSeverityButton()


        // Generate radios for unique subtypes
        
        if(uniqueSubtypes[0] !="" && selectedModel !== uniqueSubtypes[0] ){
            
            //create a title for the container
            let title = document.createElement('h3');
            title.textContent = 'Subtype'
            subtypeOptionsContainer.appendChild(title)

            uniqueSubtypes.forEach(subtype => {
            const radioContainer = document.createElement('div');
            radioContainer.setAttribute('class', 'radioContainer')

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'subtype';
            radioInput.id = subtype;
            radioInput.value = subtype;

            const inputLabel = document.createElement('label');
            inputLabel.textContent = subtype;
            inputLabel.setAttribute('for', subtype)

            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(inputLabel);

            subtypeOptionsContainer.appendChild(radioContainer);
        });
        }else{ //if subtypes are empty, check if there are clinical symptoms or subcategories

            if(uniqueClinicalSymptoms[0] !=""){

                //create a title for the container
                let title = document.createElement('h3');
                title.textContent = 'Clinical signs'
                clinicalSymptomsOptionsContainer.appendChild(title)


                uniqueClinicalSymptoms.forEach(symptom => {
                const radioContainer = document.createElement('div');
                radioContainer.setAttribute('class', 'radioContainer')
    
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'symptom';
                radioInput.id = symptom;
                radioInput.value = symptom;
    
                const inputLabel = document.createElement('label');
                inputLabel.textContent = symptom;
                inputLabel.setAttribute("for", symptom)
    
                radioContainer.appendChild(radioInput);
                radioContainer.appendChild(inputLabel);
    
                clinicalSymptomsOptionsContainer.appendChild(radioContainer);
                });
            }else{ //if the cliniczl symptoms are emtpy, check if there are durations
                if(uniqueDurations[0] !=""){

                    //create a title for the container
                    let title = document.createElement('h3');
                    title.textContent = 'Clinical signs'
                    durationOptionsContainer.appendChild(title)

                    uniqueDurations.forEach(duration => {
                    const radioContainer = document.createElement('div');
                    radioContainer.setAttribute('class', 'radioContainer')
        
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'duration';
                    radioInput.id = duration;
                    radioInput.value = duration;
        
                    const inputLabel = document.createElement('label');
                    inputLabel.textContent = duration;
                    inputLabel.setAttribute("for", duration)
        
                    radioContainer.appendChild(radioInput);
                    radioContainer.appendChild(inputLabel);
        
                    durationOptionsContainer.appendChild(radioContainer);
                    });
                }
            }
        }
    });


//set symptoms options
      // Event listener for model selection
      subtypeOptionsContainer.addEventListener('change', () => {
        
        // Clear previous options
        clinicalSymptomsOptionsContainer.innerHTML = '';
        durationOptionsContainer.innerHTML = '';

        //clear results section
        clearResultsCont()


        // Get the selected model, type and subtype
        const selectedType = selectTypeElement.value;
        
        let selectedModel='';  //need to do try catch because sometimes there is no model selected (model is same as type)
        try {
            selectedModel = modelOptionsContainer.querySelector('input[name="model"]:checked').value;
        } catch (error) {
            selectedModel = selectTypeElement.value;
        }
        
        let  selectedSubtype ='';
        try {
            selectedSubtype = subtypeOptionsContainer.querySelector('input[name="subtype"]:checked').value;
        } catch (error) {
            selectedSubtype = selectedModel
        }
        
        
        // Filter procedures based on the selected type
        const filteredProcedures = procedures.filter(procedure => procedure.type === selectedType 
                                                        && procedure.model ===selectedModel
                                                        && procedure.subcategory === selectedSubtype);

        // Extract unique values from all columns of filtered procedures
        const uniqueClinicalSymptoms = [...new Set(filteredProcedures.map(procedure => procedure.clinicalSymptoms))];
        const uniqueDurations = [...new Set(filteredProcedures.map(procedure => procedure.duration))];

        //display submit button?
        displayGetSeverityButton()


        // Generate radios for unique symptoms
        if(uniqueClinicalSymptoms[0] !=""){

            //create a title for the container
            let title = document.createElement('h3');
            title.textContent = 'Clinical signs'
            clinicalSymptomsOptionsContainer.appendChild(title)

            uniqueClinicalSymptoms.forEach(symptom => {
            const radioContainer = document.createElement('div');
            radioContainer.setAttribute('class', 'radioContainer')

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'symptom';
            radioInput.id = symptom;
            radioInput.value = symptom;

            const inputLabel = document.createElement('label');
            inputLabel.textContent = symptom;
            inputLabel.setAttribute("for", symptom)

            radioContainer.appendChild(radioInput);
            radioContainer.appendChild(inputLabel);

            clinicalSymptomsOptionsContainer.appendChild(radioContainer);
            });
        }else{ //if the cliniczl symptoms are emtpy, check if there are durations
            
            if(uniqueDurations[0] !=""){

                //create a title for the container
                let title = document.createElement('h3');
                title.textContent = 'Duration'
                durationOptionsContainer.appendChild(title)

                uniqueDurations.forEach(duration => {
                const radioContainer = document.createElement('div');
                radioContainer.setAttribute('class', 'radioContainer')
    
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'duration';
                radioInput.id = duration;
                radioInput.value = duration;
    
                const inputLabel = document.createElement('label');
                inputLabel.textContent = duration;
                inputLabel.setAttribute("for", duration)
    
                radioContainer.appendChild(radioInput);
                radioContainer.appendChild(inputLabel);
    
                durationOptionsContainer.appendChild(radioContainer);
                });
            }
        }
    });


//set duration options
      // Event listener for model selection
      clinicalSymptomsOptionsContainer.addEventListener('change', () => {
        // Clear previous options
        durationOptionsContainer.innerHTML = '';
        removeTitle(durationOptionsContainer);

        //clear results section
        clearResultsCont()

        // Get the selected model, type and subtype
        const selectedType = selectTypeElement.value;

        let selectedModel='';  //need to do try catch because sometimes there is no model selected (model is same as type)
        try {
            selectedModel = modelOptionsContainer.querySelector('input[name="model"]:checked').value;
        } catch (error) {
            selectedModel = selectTypeElement.value;
        }
        
        let  selectedSubtype ='';
        try {
            selectedSubtype = subtypeOptionsContainer.querySelector('input[name="subtype"]:checked').value;
        } catch (error) {
            selectedSubtype = selectedModel
        }

        let selectedClinicalSymptoms ='';
        try {
            selectedClinicalSymptoms = clinicalSymptomsOptionsContainer.querySelector('input[name="symptom"]:checked').value;
        } catch (error) {
            console.log("error - no clinical symptoms checked")
        }


        // Filter procedures based on the selected type
        const filteredProcedures = procedures.filter(procedure => procedure.type === selectedType 
                                                        && procedure.model ===selectedModel
                                                        && procedure.subcategory === selectedSubtype
                                                        && procedure.clinicalSymptoms === selectedClinicalSymptoms);

        // Extract unique values from all columns of filtered procedures
        const uniqueDurations = [...new Set(filteredProcedures.map(procedure => procedure.duration))];
        const uniqueClinicalSymptoms = [...new Set(filteredProcedures.map(procedure => procedure.clinicalSymptoms))];

        
        //display submit button?
        displayGetSeverityButton()


        // Generate radios for unique durations
        if(uniqueDurations[0] !=""){

            //create a title for the container
            let title = document.createElement('h3');
            title.textContent = 'Duration'
            durationOptionsContainer.appendChild(title)

            uniqueDurations.forEach(duration => {
                const radioContainer = document.createElement('div');
                radioContainer.setAttribute('class', 'radioContainer')

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'duration';
                radioInput.id = duration;
                radioInput.value = duration;

                const inputLabel = document.createElement('label');
                inputLabel.textContent = duration;
                inputLabel.setAttribute("for", duration)

                radioContainer.appendChild(radioInput);
                radioContainer.appendChild(inputLabel);

                durationOptionsContainer.appendChild(radioContainer);
            });
        }else{
            // don't check for clinical sign because that gives a bug
        }
        
    })


    // event listener for duration
    durationOptionsContainer.addEventListener('change', () =>{
        //display submit button?
        displayGetSeverityButton()

        //clear results section
        clearResultsCont()
    })



//eventlistener for reset button
    clearButton.addEventListener('click', ()=>{
        selectTypeElement.value = "Select an option"
        modelOptionsContainer.innerHTML = '';
        subtypeOptionsContainer.innerHTML = '';
        clinicalSymptomsOptionsContainer.innerHTML = '';
        durationOptionsContainer.innerHTML = '';

        displayGetSeverityButton();

        //clear results section
        clearResultsCont()
    })



//function - get the input and check f this returns one line or not, if yes, display the button and add the eventlistener for when clicked
function displayGetSeverityButton(){
    // Get the selected type, model, subtype, clinical symptoms and duration
    let selectedType = selectTypeElement.value;

    let selectedModel='';
    try {
        selectedModel = modelOptionsContainer.querySelector('input[name="model"]:checked').value;
    } catch (error) {
        selectedModel = selectTypeElement.value;
    }
    
    let  selectedSubtype ='';
    try {
        selectedSubtype = subtypeOptionsContainer.querySelector('input[name="subtype"]:checked').value;
    } catch (error) {
        selectedSubtype = selectedModel
    }

    let selectedClinicalSymptoms ='';
    try {
        selectedClinicalSymptoms = clinicalSymptomsOptionsContainer.querySelector('input[name="symptom"]:checked').value;
    } catch (error) {
        console.log("no clinical symptoms checked")
    }

    let selectedDuration ='';
    try {
        selectedDuration = durationOptionsContainer.querySelector('input[name="duration"]:checked').value;
    } catch (error) {
        console.log("no duration checked")
    }

    // Filter procedures based on the selections
    const filteredProcedures = procedures.filter(procedure => 
        procedure.type === selectedType 
        && procedure.model ===selectedModel
        && procedure.subcategory === selectedSubtype
        && procedure.clinicalSymptoms === selectedClinicalSymptoms
        && procedure.duration === selectedDuration);
    
    //check if button needs to be created or deleted, if created, check if there already is one or not
    try {
        console.log(filteredProcedures[0].type)
        try { //check if there already is a submit button . if yes, don't do anything, otherwise, create the button
            let btn = document.getElementById('getSeverity');
            let btnDiv = document.getElementById('btnDiv')
            btnDiv.removeChild(btn)

            displayGetSeverityButton()
        } catch (error) {
            //create submit button
            let btnDiv = document.getElementById('btnDiv')
            let btn = document.createElement('input')
            btn.setAttribute('type', 'button')
            btn.setAttribute('value', 'Get severity score')
            btn.setAttribute('id', 'getSeverity')

            btnDiv.prepend(btn)

            //add eventlistener for the get severity button
            btn.addEventListener('click', (e)=>{
                 e.preventDefault();

                //clear previous results
                clearResultsCont();

                // Get the selected type, model, subtype, clinical symptoms and duration
                let selectedType = selectTypeElement.value;

                let selectedModel='';
                try {
                    selectedModel = modelOptionsContainer.querySelector('input[name="model"]:checked').value;
                } catch (error) {
                    selectedModel = selectTypeElement.value;
                }
                
                let  selectedSubtype ='';
                try {
                    selectedSubtype = subtypeOptionsContainer.querySelector('input[name="subtype"]:checked').value;
                } catch (error) {
                    selectedSubtype = selectedModel
                }

                let selectedClinicalSymptoms ='';
                try {
                    selectedClinicalSymptoms = clinicalSymptomsOptionsContainer.querySelector('input[name="symptom"]:checked').value;
                } catch (error) {
                    console.log("no clinical symptoms checked")
                }

                let selectedDuration ='';
                try {
                    selectedDuration = durationOptionsContainer.querySelector('input[name="duration"]:checked').value;
                } catch (error) {
                    console.log("no duration checked")
                }

                // Filter procedures based on the selections
                const filteredProcedures = procedures.filter(procedure => 
                    procedure.type === selectedType 
                    && procedure.model ===selectedModel
                    && procedure.subcategory === selectedSubtype
                    && procedure.clinicalSymptoms === selectedClinicalSymptoms
                    && procedure.duration === selectedDuration);

                //get severity and comments of the selection and the containers to display them
                let severity = filteredProcedures[0].severityScore;
                let comment1 = filteredProcedures[0].comment1;
                let comment2 = filteredProcedures[0].comment2;
                let comment3 = filteredProcedures[0].comment3;
                
                console.log(filteredProcedures[0] )
                console.log(comment1, comment2,comment3 )

                let resultsContainer = document.getElementById('results-container')
                let severityScoreContainer = document.getElementById('severity-score')
                let selectionsContainer = document.getElementById('selections')
                let typeContainer = document.getElementById('type')
                let modelContainer = document.getElementById('model')
                let subtypeContainer = document.getElementById('subtype')
                let clinicalSymptomsContainer = document.getElementById('clinical-symptoms')
                let durationContainer = document.getElementById('duration')
                let commentsContainer = document.getElementById('comments')
                let returnBtnContainer = document.getElementById('returnBtn')
                
          
                //dislay the selections of they are not undefined
                prependElement('Details of the selected procedure', 'h3', selectionsContainer)
                appendElement('Procedure type', 'h4', typeContainer)
                appendElement(selectedType, 'p', typeContainer) 
                
                if(!(selectedModel == '' || selectedModel == selectedType)){
                    appendElement('Model', 'h4', modelContainer)
                    appendElement(selectedModel, 'p', modelContainer) 
                }
                
                if(!(selectedSubtype == '' || selectedSubtype == selectedModel)){
                    appendElement('Subtype', 'h4', subtypeContainer)
                    appendElement(selectedSubtype, 'p', subtypeContainer) 
                }
                
                if(!(selectedClinicalSymptoms == '' || selectedClinicalSymptoms == selectedSubtype)){
                    appendElement('Clinical signs', 'h4', clinicalSymptomsContainer)
                    appendElement(selectedClinicalSymptoms, 'p', clinicalSymptomsContainer) 
                }
            
                if(!(selectedDuration == '' || selectedDuration == selectedClinicalSymptoms)){
                    appendElement('Duration', 'h4', durationContainer)
                    appendElement(selectedDuration, 'p', durationContainer) 
                }

                //if they are not undefined or empty, create a p element for them and append them to the results container
                if(severity !== '' && severity !== undefined ){
                    prependElement('Severity Score', 'h3', severityScoreContainer)
                    appendElement(severity, 'p', severityScoreContainer);
                }
                if(comment1 !== '' && comment1 !== undefined){
                    prependElement('Comments and Remarks', 'h3', commentsContainer)
                    appendElement(comment1, 'p', commentsContainer);
                }
                if(comment2 !== '' && comment2 !== undefined){
                    appendElement(comment2, 'p', commentsContainer);
                }
                if(comment3 !== '' && comment3 !== undefined){
                    appendElement(comment3, 'p', commentsContainer);
                }

                console.log(comment1, comment2,comment3 )

                
                // Get the modal
                var modal = document.getElementById("myModal");

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks on the button, open the modal
                
                modal.classList.remove('hidden')
                

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                modal.classList.add('hidden')
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                if (event.target == modal) {
                    modal.classList.add('hidden')
                }
                }
                

            })
        }

    } catch (error) {
        try {
            let btnDiv = document.getElementById('btnDiv')
            let btn = document.getElementById('getSeverity')

            btnDiv.removeChild(btn)
        } catch (error) {
            //there is no button
        }
        
    }
}


    })
    .catch(error => {
      console.log('Error:', error);
    });

  }); //end of window event listener
  


  // Function to remove the title from a container if it exists
    function removeTitle(container) {
        const title = container.querySelector('h3');
        if (title) {
        container.removeChild(title);
        }
    }


//function to create an element and to append to a container
function appendElement(value, elementType, container){
    let element = document.createElement(elementType);
    element.innerHTML = value;
    container.appendChild(element);
}

//function to create an element and to prepend to a container
function prependElement(value, elementType, container){
    let element = document.createElement(elementType);
    element.innerHTML = value;
    container.prepend(element);
}


//function to clear the results container
function clearResultsCont() {
    let modalHeader = document.getElementById("modalHeader")
    modalHeader.innerHTML = `<div class="severity-score" id="severity-score"></div>
    <span class="close">&times;</span>`

    let modalBody = document.getElementById("modalBody")
    modalBody.innerHTML = `<div class="selections" id="selections">
    <div id="type">
    </div>
    <div id="model">
    </div>
    <div id="subtype">
    </div>
    <div id="clinical-symptoms">
    </div>
    <div id="duration">
    </div>
    </div>                     
    <div class="comments" id="comments"></div>`

}




