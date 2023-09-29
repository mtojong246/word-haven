

export default function Dashboard() {
    return (
        <div className='container-fluid' style={{padding: '40px'}}>
            <div className='container-fluid mx-auto d-flex' style={{maxWidth: '900px', gap: '40px'}}>
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a className="nav-link" id="v-pills-favorites-tab" data-toggle="pill" href="#v-pills-favorites" role="tab" aria-controls="v-pills-favorites" aria-selected="false">Favorites</a>
                    <a className="nav-link" id="v-pills-subscriptions-tab" data-toggle="pill" href="#v-pills-subscriptions" role="tab" aria-controls="v-pills-subscriptions" aria-selected="false">Subscriptions</a>
                    <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h3>Welcome to your dashboard!</h3>
                        <p>Here you can view your saved words, manage your subscriptions, and make changes to your profile.</p>
                    </div>
                    <div className="tab-pane fade" id="v-pills-favorites" role="tabpanel" aria-labelledby="v-pills-favorites-tab">...</div>
                    <div className="tab-pane fade" id="v-pills-subscriptions" role="tabpanel" aria-labelledby="v-pills-subscriptions-tab">...</div>
                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                </div>
            </div>
        </div>
    )
}