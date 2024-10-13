
export class Board{

    openIncidents: String;
    resolvedIncidents: String;
    incomingCalls: String;
    outgoingCalls: String;
    avgTimeHours: String;
    complianceLevel: String;

    constructor(openIncidents: String, resolvedIncidents: String, incomingCalls: String, outgoingCalls: String, avgTimeHours: String, complianceLevel: String){
        this.openIncidents = openIncidents;
        this.resolvedIncidents = resolvedIncidents;
        this.incomingCalls = incomingCalls;
        this.outgoingCalls = outgoingCalls;
        this.avgTimeHours = avgTimeHours;
        this.complianceLevel = complianceLevel;
    }
}